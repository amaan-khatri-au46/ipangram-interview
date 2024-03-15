import { useAppSelector } from "../../store/store";

const useUserRoleRoutes = () => {
  const { role } = useAppSelector((state) => state.auth);

  const generateRoutes = () => {
    const defaultRoutes = [
      {
        title: "Employee Details",
        route: "/",
      },
    ];

    if (role === "manager") {
      return [
        ...defaultRoutes,
        {
          title: "Employee Directory",
          route: "/employee-directory",
        },
        {
          title: "Department",
          route: "/department-management",
        },
      ];
    }

    return defaultRoutes;
  };

  return generateRoutes();
};

export default useUserRoleRoutes;
