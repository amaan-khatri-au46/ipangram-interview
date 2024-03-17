import { Container } from "@mui/material";

const AccessDenied = () => {
  return (
    <Container className="flex justify-center" style={{ height: "100vh" }}>
      <div className="h-full flex flex-col items-center justify-center">
        <img src="/img/accessDenied/img-2-dark.png" alt="Access Denied" />
        <div className="mt-6 text-center">
          <h3 className="mb-2">Access Denied!</h3>
          <p className="text-base">You have no permission to visit this page</p>
        </div>
      </div>
    </Container>
  );
};

export default AccessDenied;
