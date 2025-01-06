"use client";

// Components
import Logo from "@components/Logo";
import Translate from "@components/Translate";

// Styled
import { LoginContainer, LoginFooter, LoginMain } from "./styled";

export default function SignInLayout({ children }: { children: React.ReactNode }) {
    return <LoginContainer>
        <LoginMain>
            <Logo height={100} width={200} />
            {children}
        </LoginMain>

        <LoginFooter>
            <Translate />
        </LoginFooter>
    </LoginContainer>;
}