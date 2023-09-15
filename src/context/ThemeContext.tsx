import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

interface ThemeContextProvider {
    children: React.ReactNode;
}

export const ThemeContext = React.createContext({
    isDark: false,
    toggleTheme: () => {},
});

export const ThemeContextProvider = ({children}: ThemeContextProvider) => {
    const [isDark, setIsDark] = React.useState<boolean>(false);

    React.useEffect(() => {
        const getTheme = async () => {
            const theme = await AsyncStorage.getItem('isDark');
            if (theme) {
                setIsDark(JSON.parse(theme));
            }
        }
        getTheme();
    }, [])

    const toggleTheme = async () => {
        await AsyncStorage.setItem('isDark', JSON.stringify(!isDark));
        setIsDark(!isDark);
    }

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}