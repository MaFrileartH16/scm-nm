import { theme } from '@/theme.js';
import { createInertiaApp } from '@inertiajs/react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import 'mantine-react-table/styles.css';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import './bootstrap';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <MantineProvider theme={theme}>
        <Notifications position="top-center" limit={1} />

        <App {...props} />
      </MantineProvider>,
    );
  },
  progress: {
    color: '#4B5563',
  },
});
