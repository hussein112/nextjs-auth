import "./globals.css";
import Provider from "./Provider";
export const metadata = {
  title: "Next Auth",
  description: "Authentication using JWT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
