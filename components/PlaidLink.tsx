import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaidLink, type PlaidLinkOptions } from "react-plaid-link";
import { Button } from "@/components/ui/button";

import { routes } from "@/constants";
import { createLinkToken } from "@/lib/actions/plaid/create-link-token";
import { exchangePublicToken } from "@/lib/actions/plaid/exchangePublicToken";

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
        <Button>Connect Bank</Button>
      ) : (
        <Button></Button>
      )}
    </>
  );
}

export default PlaidLink;
