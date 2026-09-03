import { createContext, useContext, useEffect, useState } from "react";
import { settings as fetchSettingsApi } from "../api/settings";
import { useAuth } from "./AuthContext";
import { getAttachmentUrl } from "../utils/taskForm";

const defaultSettings = {
    company_name: "",
    company_email: "",
    company_phone: "",
    privacy_policy: "",
    terms_of_service: "",
    company_logo: null,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
    const { user, authLoading } = useAuth();
    const [settings, setSettings] = useState(defaultSettings);
    const [settingsLoading, setSettingsLoading] = useState(true);

    const refreshSettings = async () => {
        const response = await fetchSettingsApi();
        setSettings({
            ...defaultSettings,
            ...(response.data.data || {}),
        });
        return response.data.data;
    };

    useEffect(() => {
        const loadSettings = async () => {
            if (authLoading) return;

            if (!user) {
                setSettings(defaultSettings);
                setSettingsLoading(false);
                return;
            }

            try {
                await refreshSettings();
            } catch (error) {
                setSettings(defaultSettings);
            } finally {
                setSettingsLoading(false);
            }
        };

        loadSettings();
    }, [authLoading, user]);

    return (
        <SettingsContext.Provider value={{
            settings,
            setSettings,
            settingsLoading,
            refreshSettings,
            companyName: settings.company_name || "EMS",
            logoUrl: getAttachmentUrl(settings.company_logo?.path),
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
