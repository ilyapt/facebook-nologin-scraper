const exec = require('child_process').exec;

jest.setTimeout(20000)


it('Zuck Profile should be collected from command line', async () => {
    const runCommand = `node bin/facebook-nologin-scraper.js https://www.facebook.com/zuck`;
    const myShellScript = exec(runCommand);

    await new Promise((resolve, reject) => {
        myShellScript.stdout.on('data', (out) => {
            // console.log(out);
            const data = JSON.parse(out);
            expect(data.name).toBe('Mark Zuckerberg');
            resolve(data);
        });
        myShellScript.stderr.on('data', (error) => {
            console.error(error);
            expect(error).toBe(null);
            reject(error)
        });
    });
});
