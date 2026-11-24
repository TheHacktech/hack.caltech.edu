#!/usr/bin/env bash
set -euo pipefail

branch=${1:?Expected staging or prod}
case "$branch" in
  staging|prod) ;;
  *) echo "Unknown deployment branch: $branch" >&2; exit 1 ;;
esac

revision=$(cat release/revision)
[[ "$revision" =~ ^[a-f0-9]{40}$ ]]
for page in index.html live/index.html organizer-interest/index.html; do
  test -s "release/site/$page"
done

# Deployment branches are provisioned once. Every subsequent push fast-forwards.
target="$RUNNER_TEMP/site-$branch"
git fetch --depth=1 origin "refs/heads/$branch"
git worktree add --detach "$target" FETCH_HEAD
# Bundle hashes can change without changing the length or timestamp of the HTML.
rsync -a --checksum --delete --exclude=.git release/site/ "$target/"
git -C "$target" add --all

current=$(git ls-remote --exit-code origin refs/heads/master | cut -f1)
if [[ "$revision" != "$current" ]]; then
  echo "Master advanced from $revision to $current during this build."
  if [[ "$branch" == prod ]]; then
    echo "Run Deploy production again to release the new revision." >&2
    exit 1
  fi
  exit 0
fi

# Record which source passed the build even when only the workflow or docs changed.
previous=$(git -C "$target" log -1 --format='%(trailers:key=Source-commit,valueonly)')
if [[ "$previous" != "$revision" ]] || ! git -C "$target" diff --cached --quiet; then
  git -C "$target" -c user.name='github-actions[bot]' \
    -c user.email='41898282+github-actions[bot]@users.noreply.github.com' \
    commit --allow-empty -m "Build website from ${revision:0:12}" -m "Source-commit: $revision"
  git -C "$target" push origin "HEAD:refs/heads/$branch"
fi
echo "current=true" >> "$GITHUB_OUTPUT"
