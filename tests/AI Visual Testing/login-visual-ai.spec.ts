import { test } from '@playwright/test';
import { BatchInfo, Configuration, EyesRunner, VisualGridRunner, BrowserType, DeviceName, ScreenOrientation, Eyes, Target } from '@applitools/eyes-playwright';

export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;

test.beforeAll(async() => {

    // Configure Applitools SDK to run on the Ultrafast Grid
    Runner = new VisualGridRunner({ testConcurrency: 1 });
    Batch = new BatchInfo({name: `Login visual test`});

    Config = new Configuration();
    Config.setBatch(Batch);
    Config.addBrowsers(
        { name: BrowserType.CHROME, width: 800, height: 600 },
        { name: BrowserType.FIREFOX, width: 1600, height: 1200 },
        { name: BrowserType.SAFARI, width: 1024, height: 768 },
        { chromeEmulationInfo: { deviceName: DeviceName.iPhone_11, screenOrientation: ScreenOrientation.PORTRAIT} },
        { chromeEmulationInfo: { deviceName: DeviceName.Nexus_10, screenOrientation: ScreenOrientation.LANDSCAPE} }
    )
    Config.setApiKey(`${process.env.APLITOOLS_KEY}`);
});

test.describe('login tests', () => {
    let eyes: Eyes;
    test.beforeEach(async ({ page }) => {
        eyes = new Eyes(Runner, Config);

        // Start Applitools Visual AI Test
        // Args: Playwright Page, App Name, Test Name, Viewport Size for local driver
        await eyes.open(page, 'Jelou', `Login page`, { width: 1200, height: 600 })
    });
    
    test('log into a admin account', async ({ page }) => {
        // Go to the starting url before each test.
        await page.goto('login');

        // Full Page - Visual AI Assertion
        await eyes.check('Login page', Target.window().fully());

        // Fill login inputs and click in button
        await page.locator('input[id=\'email\']').fill(`${process.env.USER_ADMIN}`);
        await page.locator('input[id=\'password\']').fill(`${process.env.PASSWORD_ADMIN}`);

        // Click in login Button
        await page.getByRole('button', { name: /Iniciar sesión/i }).click();

        // Full Page - Visual AI Assertion
        await eyes.check('Main page', Target.window().fully()
            // Uncomment to apply Layout regions and have test pass
            /* .layoutRegions(
                '.dashboardOverview_accountBalances__3TUPB',
                '.dashboardTable_dbTable___R5Du'
            ) */
        );
    });

    test.afterEach(async () => {
        // End Applitools Visual AI Test
        await eyes.close();
    });
});

test.afterAll(async() => {
    // Wait for Ultrast Grid Renders to finish and gather results
    const results = await Runner.getAllTestResults();
    console.log('Visual test results', results);
});