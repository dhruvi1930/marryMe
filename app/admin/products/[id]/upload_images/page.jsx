import React from "react";
import UploadImages from "@/components/admin/UploadImages";

const UploadImagePage = async ({ params }) => {
  return <UploadImages id={params?.id} />;
};

export default UploadImagePage;
