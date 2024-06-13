"use client";

import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import WriteArticle from "./WriteArticle";
import ArticleSettings from "./ArticleSettings";

const ArticlePage = () => {
  const [contentMarkdown, setContentMarkdown] = useState<string>("");

  return (
    <Stack spacing={5} position="relative" className="mainContainer">
      <ArticleSettings body={contentMarkdown} />
      <WriteArticle setContentMarkdown={setContentMarkdown} />
    </Stack>
  );
};

export default ArticlePage;
