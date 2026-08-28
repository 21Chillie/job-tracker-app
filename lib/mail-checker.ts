import MailChecker from "mailchecker";
import z from "zod";

export const disposableDomains = MailChecker;
export const emailSchema = z.email({ error: "Invalid email address" }).refine(
  (val) => {
    const isDisposable = disposableDomains.isValid(val.toLowerCase());
    return isDisposable
  },
  {
    error: "Disposable email addresses are not allowed.",
  },
);

disposableDomains.blacklist()