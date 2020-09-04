const exec = require('child_process').exec;

jest.setTimeout(20000)

// https://www.facebook.com/zuck
const url = `https://raw.githubusercontent.com/gustawdaniel/facebook-nologin-scraper/organization/tests/pages/fb-log-zuck.html`;


it('Zuck Profile should be collected from command line', async () => {
    const runCommand = `node bin/facebook-nologin-scraper.js ${url}`;
    const myShellScript = exec(runCommand);

    await new Promise((resolve, reject) => {
        myShellScript.stdout.on('data', (out: string) => {
            // console.log(out);
            const data = JSON.parse(out);
            expect(data.name).toBe('Mark Zuckerberg');
            resolve(data);
        });
        myShellScript.stderr.on('data', (error: string) => {
            console.error(error);
            expect(error).toBe(null);
            reject(error)
        });
    });
});
