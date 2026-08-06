"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/stores";
import { Loader2 } from "lucide-react";

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && !user) {
      router.replace("/admin/login");
    }
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="flex h-full min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  return <>{children}</>;
}
