import React, { useContext, useCallback } from "react";
import { toast } from "react-toastify";

import { AuthCotext } from "@context/AuthContext";

// eslint-disable-next-line no-undef
function OnlyPremium({ children }: { children: JSX.Element }) {
  const { user } = useContext(AuthCotext);

  const onClickHandle = useCallback(() => {
    if (!user?.premium) {
      toast.warn(
        "Assine o Bebanca para ter acesso a todos os beneficios de um usuário premium!",
        {
          position: "top-center",
        }
      );
      return () => null;
    }

    return children.props.onClick.call();
  }, [children.props, user?.premium]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {{
        ...children,
        props: { ...children.props, onClick: onClickHandle },
      }}
    </>
  );
}

export default OnlyPremium;
