const OWNER = "mahaddev-x";
const REPO = "claude-session-keeper";
const WORKFLOW = "claude-keeper.yml";
const REF = "main";

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(dispatch(env));
  },
};

async function dispatch(env) {
  if (!env.GITHUB_DISPATCH_TOKEN) {
    console.error("GITHUB_DISPATCH_TOKEN is not set - cannot dispatch.");
    return;
  }

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW}/dispatches`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_DISPATCH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "claude-keeper-dispatcher",
      "Content-Type": "application/json",
    },
    // No inputs - the workflow's own state decides whether it's actually due.
    body: JSON.stringify({ ref: REF }),
  });

  // 204 No Content is the success case for this endpoint.
  if (res.status !== 204) {
    console.error(`dispatch failed: ${res.status} ${await res.text()}`);
    return;
  }
  console.log("dispatched");
}
