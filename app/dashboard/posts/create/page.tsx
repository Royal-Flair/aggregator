"use client"

import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import WriteArticle from "./WriteArticle";
import ArticleSettings from "./ArticleSettings";

const ArticlePage = () => {
  const [contentMarkdown, setContentMarkdown] = useState<string>("");

  return (
    <Stack spacing={5} position="relative" className="mainContainer">
      <iframe width="100%" height="1400px" src="http://localhost:3001/dashboard/posts/create" />
    </Stack>
  );
};

export default ArticlePage;
