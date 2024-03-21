import { useAppSelector } from "src/store/store";

const useUserRoleRoutes = () => {
  const { role } = useAppSelector((state) => state.auth);

  const generateRoutes = () => {
    const defaultRoutes = [
      {
        title: "EMPLOYEE DETAILS",
        route: "/",
      },
    ];

    if (role === "manager") {
      return [
        ...defaultRoutes,
        {
          title: "EMPLOYEE DIRECTORY",
          route: "/employee-directory",
        },
        {
          title: "DEPARTMENT",
          route: "/department-management",
        },
      ];
    }

    return defaultRoutes;
  };

  return generateRoutes();
};

export default useUserRoleRoutes;
