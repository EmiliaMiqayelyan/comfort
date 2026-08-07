"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/stores";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const t = useTranslations("admin");
  const { login, user } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }
  }, [user, router]);

  if (user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const ok = login(email, password);
    setLoading(false);
    if (ok) {
      router.replace("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">Comfort CMS</h1>
          <p className="mt-2 text-sm text-zinc-400">{t("loginSubtitle")}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/5 bg-[#141a24] p-8 shadow-soft"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                {t("email")}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@comfort.am"
                required
                className="rounded-xl border-white/10 bg-[#0b0f17] text-zinc-100 placeholder:text-zinc-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                {t("password")}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="rounded-xl border-white/10 bg-[#0b0f17] text-zinc-100 placeholder:text-zinc-600"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{t("loginError")}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {loading ? t("signingIn") : t("login")}
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-500">{t("loginHint")}</p>
        </form>
      </div>
    </div>
  );
}
