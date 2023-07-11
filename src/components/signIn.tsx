"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export function SignIn() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        className: "bg-red-400 border-none font-bold text-zinc-200 rounded",
        title: "Atenção",
        description:
          "Erro ao fazer login com google, tente novamente mais tarde!",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        disabled={isLoading}
        onClick={loginWithGoogle}
        className="p-2 rounded bg-zinc-700 hover:brightness-110 transition-all disabled:opacity-50 disabled:hover:brightness-100 disabled:cursor-not-allowed"
      >
        Login com google
      </button>
    </div>
  );
}
