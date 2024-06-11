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
      <WriteArticle setContentMarkdown={(content) => setContentMarkdown(content)} />
    </Stack>
  );
};

export default ArticlePage;