import { withAuth } from "next-auth/middleware";

export default withAuth(async function middleWare(req) {
  //authorize roles
});

export const config = {
  matcher: ["/me"],
};
