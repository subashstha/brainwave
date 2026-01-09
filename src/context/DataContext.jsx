import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/data/mock.json");
        const dataResponse = await response.json();
        setData(dataResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleData();
  }, []);

  return (
    <DataContext.Provider value={{ data, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};
