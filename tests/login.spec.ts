import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('login tests', () => {

    test.use({
        viewport: { width: 1920, height: 945 },
    });

    test.beforeEach(async ({ page }) => {
        // Go to the starting url before each test.
        await page.goto('login');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Jelou®/);
    });

    test('Login succesful admin user', async ({ page }) => {
        await test.step('Log in', async () => {
            // Fill login inputs and click in button
            await page.locator('input[id=\'email\']').fill(`${process.env.USER_ADMIN}`);
            await page.locator('input[id=\'password\']').fill(`${process.env.PASSWORD_ADMIN}`);

            // Click in login Button
            await page.getByRole('button', { name: /Iniciar sesión/i }).click();

            // Validate succesful login
            await expect(page.getByText('Jelou Francisco!')).toBeVisible();
        });

        await test.step('Notification modal', async () => {
            test.slow();

            // Click in notification modal if exist
            const notificationModalButton = page.getByRole('button', { name: /Aceptar/i })

            await expect.soft(notificationModalButton).toBeVisible();

            if (await notificationModalButton.isVisible()) {
                await notificationModalButton.click();
            }
        });

        await test.step('Log out', async () => {
            // Logout session
            await page.getByRole('button', { name: 'FC' }).click();
            await page.getByText('Cerrar sesión').click();

            // Click in notification modal PMA desconection if exist
            const notificationModalPMA = page.getByRole('button', { name: 'Desconectar' })

            await expect.soft(notificationModalPMA).toBeVisible();

            if (await notificationModalPMA.isVisible()) {
                await notificationModalPMA.click();
            }

            await expect(page.getByText('Bienvenido!')).toBeVisible();
        });
    });

    test('Login succesful test user', async ({ page }) => {
        await test.step('Log in', async () => {
            // Fill login inputs and click in button
            await page.locator('input[id=\'email\']').fill(`${process.env.USER_TEST}`);
            await page.locator('input[id=\'password\']').fill(`${process.env.PASSWORD_TEST}`);

            // Click in login Button
            await page.getByRole('button', { name: /Iniciar sesión/i }).click();

            // Validate succesful login
            await expect(page.getByText('Jelou Francisco!')).toBeVisible();
        });

        await test.step('Log out', async () => {
            // Logout session
            await page.getByRole('button', { name: 'FC' }).click();
            await page.getByText('Cerrar sesión').click();

            await expect(page.getByText('Bienvenido!')).toBeVisible();
        });
    });

    test('Login succesful dev user', async ({ page }) => {
        await test.step('Log in', async () => {
            // Fill login inputs and click in button
            await page.locator('input[id=\'email\']').fill(`${process.env.USER_DEV}`);
            await page.locator('input[id=\'password\']').fill(`${process.env.PASSWORD_DEV}`);

            // Click in login Button
            await page.getByRole('button', { name: /Iniciar sesión/i }).click();

            // Validate succesful login
            await expect(page.getByText('Jelou Francisco!')).toBeVisible();
        });

        await test.step('Log out', async () => {
            // Logout session
            await page.getByRole('button', { name: 'FQ' }).click();
            await page.getByText('Cerrar sesión').click();

            await expect(page.getByText('Bienvenido!')).toBeVisible();
        });
    });

    test('Login failed', async ({ request }) => {
        const randomEmail = faker.internet.email();
        const randomPassword = faker.internet.password()
        const response = await request.post('https://api.apps.jelou.ai/api/auth/login', {
            data: {
                email: randomEmail,
                password: randomPassword,
            }
        });

        await expect(response).not.toBeOK();
    });

    test('Change languaje to EN', async ({ page }) => {
        await page.locator('div').filter({ hasText: /^Es$/ }).first().click();
        await page.getByText('En', { exact: true }).click();
        await expect(page.getByText('Welcome!')).toBeVisible();
    })

    test('Change languaje to PT', async ({ page }) => {
        await page.locator('div').filter({ hasText: /^Es$/ }).first().click();
        await page.getByText('Pt', { exact: true }).click();
        await expect(page.getByText('Bem-vindo!')).toBeVisible();
    })

    test.skip("Has a good LCP in login page", async ({ page }) => {
        // Inject custom JavaScript into the page,
        // Evaluate the “largest contentful paint” metric
        // and pass it back to the Playwright scope
        const LCP: number | undefined = await page.evaluate(() => {
            return new Promise((resolve) => {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries()
                    const latestEntry = entries.at(-1)
                    if (latestEntry) {
                        resolve(latestEntry.startTime)
                    } else {
                        resolve(undefined)
                    }
                }).observe({
                    type: "largest-contentful-paint",
                    buffered: true,
                })
            })
        })
        if (LCP !== undefined) {
            expect(LCP).toBeLessThan(2500)
        } else {
            // Handle the case where LCP is undefined, if needed
            console.warn("LCP is undefined")
        }
    })

    test.skip('Example visual test', async ({ page }) => {
        //await page.goto('https://playwright.dev');
        await expect(page).toHaveScreenshot('landing.png');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

});