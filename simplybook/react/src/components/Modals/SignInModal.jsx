import { useState } from "react";
import { ReactComponent as Logo } from "../../../../assets/img/logo.svg";
import {__} from "@wordpress/i18n";

import FormTwoFa from "./Partials/FormTwoFa";
import FormLogin from "./Partials/FormLogin";

const SignInModal = ({onClose}) => {

    const [require2fa, set2fa] = useState(false);
    const [authSessionId, setAuthSessionId] = useState("");
    const [companyLogin, setCompanyLogin] = useState("");
    const [userLogin, setUserLogin] = useState("");
    const [domain, setDomain] = useState("default:simplybook.it");
    const [twoFaProviders, setTwoFaProviders] = useState({ga: __("Google Authenticator", "simplybook")});

    return (
        <div className="signin-modal-bg fixed z-999 inset-0 flex items-center justify-center bg-black/50 border-2 border-gray-200 ">
            <div className="signin-modal mt-8 w-3/8 bg-white p-4 px-4 rounded border-3 border-gray-200">
                {!require2fa ? (
                    <>
                        <div className="flex flex-col items-center mb-8">
                            <Logo className="mx-4 w-65 py-2 my-4" />
                            <h2 className="my-4">{__("Sign In", "simplybook")}</h2>
                            <small>{__("Please enter your SimplyBook.me credentials to sign in.", "simplybook")}</small>
                        </div>
                        <FormLogin
                            onClose={onClose}
                            setRequire2fa={set2fa}
                            setAuthSessionId={setAuthSessionId}
                            setCompanyLogin={setCompanyLogin}
                            setUserLogin={setUserLogin}
                            setTwoFaProviders={setTwoFaProviders}
                            setDomain={setDomain}
                            domain={domain}
                        />
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center mb-8">
                            <Logo className="mx-4 w-65 py-2 my-4" />
                            <h2 className="my-4">{__("2FA authentication", "simplybook")}</h2>
                            <small>{__("Please use your 2FA provider to sign in.", "simplybook")}</small>
                        </div>
                        <FormTwoFa
                            authSessionId={authSessionId}
                            companyLogin={companyLogin}
                            userLogin={userLogin}
                            domain={domain}
                            twoFaProviders={twoFaProviders}
                            onClose={onClose}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default SignInModal;