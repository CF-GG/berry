import {Filename, ppath, xfs} from '@yarnpkg/fslib';

describe(`Features`, () => {
  describe(`V1 Migration`, () => {
    test(
      `it should enable the node-modules linker when migrating from v1`,
      makeTemporaryEnv({
        dependencies: {
          [`no-deps`]: `1.0.0`,
        },
      }, async ({path, run, source}) => {
        await xfs.writeFilePromise(ppath.join(path, Filename.lockfile), `# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.\n# yarn lockfile v1\n\n\n\n`);

        await run(`install`);

        await expect(xfs.existsPromise(ppath.join(path, Filename.nodeModules, `no-deps` as Filename))).resolves.toEqual(true);
      }),
    );
  });
});