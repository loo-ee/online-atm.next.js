import UserContextProvider from '@/contexts/UserContext';
import Controls from './Controls';
import './globals.css';
import Header from './Header';
import Panel from './Panel';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col bg-primary">
        <UserContextProvider>
          <Header />

          <div className="mt-28 flex flex-row">
            <Controls />

            {children}

            <Panel />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
