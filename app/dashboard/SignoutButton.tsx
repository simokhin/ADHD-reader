"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();

  return (
    <Button
      className="hover:cursor-pointer"
      onClick={async () =>
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
            },
          },
        })
      }
    >
      <LogOut />
    </Button>
  );
}
