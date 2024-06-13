import Login from "@/components/Login";
import ModelsProvider from "@/providers/ModelsProvider";
import dynamic from "next/dynamic";
import QueryClientProvider from "@/providers/QueryClientProvider";
import SessionProvider from "@/providers/SessionProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import ToastProvider from "@/providers/ToastProvider";
import { getServerSession } from "next-auth";
import { FirebaseProvider } from "@/providers/FirebaseProvider";

const OpenAIProvider = dynamic(() => import("@/providers/OpenAIProvider"), {
  ssr: false,
});


const Providers = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return (
    <ThemeProvider>
      <ToastProvider />
      <SessionProvider session={session}>
        {!session ? (
          <Login />
        ) : (
          <FirebaseProvider>
            <QueryClientProvider>
              <OpenAIProvider>
                <ModelsProvider>{children}</ModelsProvider>
              </OpenAIProvider>
            </QueryClientProvider>
          </FirebaseProvider>
        )}
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
