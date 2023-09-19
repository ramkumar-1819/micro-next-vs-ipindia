export const getBanner = (key) => {
  switch (key) {
    case "easy-monthly-emi":
      return (
        <div className="flex flex-col gap-1">
          <p className="text-[13px] text-[#606162] text-center">
            Easy monthly EMI options available
          </p>
          {getBanner("no-spam")}
        </div>
      );
    case "no-spam":
      return (
        <p className="text-[13px] text-[#606162] text-center">
          No Spam. No Sharing. 100% Confidentiality.
        </p>
      );
    case "easy-monthly-emi-hi":
      return (
        <div className="flex flex-col gap-1">
          <p className="text-[13px] text-[#606162] text-center">
            आसान मासिक ईएमआई विकल्प उपलब्ध हैं
          </p>
          {getBanner("no-spam-hi")}
        </div>
      );
    case "no-spam-hi":
      return (
        <p className="text-[13px] text-[#606162] text-center">
          कोई स्पैम नहीं। कोई साझाकरण नहीं। 100% गोपनीयता।
        </p>
      );
    case "statutory-fees":
      return (
        <p className="text-[13px] text-[#231f20] text-center italic">
          *₹500 + Statutory fees will be collected later
        </p>
      );
    case "vendor-fees":
      return (
        <p className="text-[13px] text-[#231f20] text-center italic">
          *Vendor fees will be collected later based on your city
        </p>
      );
    case "500-later":
      return (
        <p className="text-[13px] text-[#231f20] text-center italic">
          *₹500 will be collected later
        </p>
      );
    default:
      return <></>;
  }
};
