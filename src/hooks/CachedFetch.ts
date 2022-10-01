// by @frolic imported from web3 scaffold: https://github.com/holic/web3-scaffold

const cache: Partial<Record<string, Promise<Response>>> = {};

export const CachedFetch = async (
  ...args: ConstructorParameters<typeof Request>
) => {
  const req = new Request(...args);
  if (req.method !== "GET") {
    throw new Error("CachedFetch does not support methods other than GET");
  }

  const key = req.url;
  const cached = cache[key];
  if (cached) return cached.then((res) => res.clone());

  const res = fetch(req);
  cache[key] = res;

  // unset cache if fetch fails
  res.catch(() => delete cache[key]);

  return res.then((res) => res.clone());
};
