import { getAttachmentUrl } from "../../utils/taskForm";
import { useSettings } from "../../context/SettingsContext";

function CompanyBrand({
    textClass = "text-2xl font-semibold text-app-text break-words",
    imgClass = "h-10 max-h-12 max-w-[200px] object-contain object-left",
}) {
    const { companyName, logoUrl } = useSettings();

    if (logoUrl) {
        return (
            <img
                src={logoUrl}
                alt={companyName}
                className={imgClass}
            />
        );
    }

    return <h1 className={textClass}>{companyName}</h1>;
}

export default CompanyBrand;
