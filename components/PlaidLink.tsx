import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaidLink, type PlaidLinkOptions } from "react-plaid-link";
import { Button } from "@/components/ui/button";

import { routes } from "@/constants";
import { createLinkToken } from "@/lib/actions/plaid/create-link-token";
import { exchangePublicToken } from "@/lib/actions/plaid/exchangePublicToken";
import { cn } from "@/lib/utils";
import { MdAddCard } from "react-icons/md";

function PlaidLink({ user, variant }: PlaidLinkProps) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const onSuccess = useCallback(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      console.log("[PlaidLink] Success", public_token);

      router.push(routes.home());
      router.refresh();
    },
    [user]
  );

  useEffect(() => {
    const getLinkToken = async () => {
      const createLinkTokenRes = await createLinkToken(user);

      if (!createLinkTokenRes?.success) {
        console.log("[PlaidLink] Error", createLinkTokenRes.error);
      }

      setToken(createLinkTokenRes?.data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <button
          onClick={() => open()}
          className="flex gap-3 items-center p-2 md:p-3 2xl:p-4 rounded-lg w-full select-none"
        >
          <div className="flex justify-center items-center">
            <MdAddCard className={cn("w-6 h-6 text-gray-400 select-none")} />
          </div>

          <p
            className={cn(
              "text-16 font-semibold text-black-2 select-none hidden lg:block"
            )}
          >
            Connect Bank
          </p>
        </button>
      ) : (
        <Button className="" onClick={() => open()}>
          Connect Bank
        </Button>
      )}
    </>
  );
}

export default PlaidLink;
