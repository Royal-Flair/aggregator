"use client";

import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  GridItem,
  SimpleGrid,
  Skeleton,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import Link from "next/link";

interface BlogTagsProps {
  marginTop?: number;
  tags: string[];
}

const BlogTags = ({ marginTop = 0, tags }: BlogTagsProps) => {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag: string) => (
        <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
          {tag}
        </Tag>
      ))}
    </HStack>
  );
};

interface Article {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  tags: string[];
}

const ArticleList = () => {
  const supabase = createClient();
  const [articleData, setArticleData] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getArticleData = async () => {
    try {
      const { data, error } = await supabase.from("posts").select();
      if (error) throw error;
      setArticleData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticleData();
  }, []);

  if (loading) {
    return (
      <SimpleGrid
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(6, 1fr)" }}
        spacing="40px"
      >
        {[0, 1, 2].map((item) => (
          <GridItem colSpan={{ base: 6, lg: 2 }} key={item}>
            <Wrap spacing="30px" marginBottom="10">
              <WrapItem width="100%">
                <Box w="100%" height="100%">
                  <Box borderRadius="lg" overflow="hidden">
                    <Skeleton height="400px" />
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </GridItem>
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return <Text color="red.500">Error loading articles: {error}</Text>;
  }

  return (
    <Box marginTop="20" className="mainContainer">
      <Heading variant="primary-heading" mt={20}>
        Stories by Suraj Vishwakarma
      </Heading>
      <Flex justifyContent="space-between">
        <Heading variant="secondary-heading" marginTop="10" marginBottom="10">
          Latest articles
        </Heading>
        <Link href="/dashboard/posts/create">
          <Button variant="primary-button">Create</Button>
        </Link>
      </Flex>
      <SimpleGrid
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(6, 1fr)" }}
        spacing="40px"
      >
        {articleData && articleData.map((item: Article) => (
          <GridItem colSpan={{ base: 6, lg: 2 }} key={item.id}>
            <Wrap spacing="30px" marginBottom="10">
              <WrapItem width="100%">
                <Box w="100%" height="100%">
                  <Box borderRadius="lg" overflow="hidden">
                    <Link href={`/${item.slug}`}>
                      <Image
                        transform="scale(1.0)"
                        src={item.thumbnail}
                        alt={item.title}
                        objectFit="contain"
                        width="100%"
                        transition="0.3s ease-in-out"
                        _hover={{ transform: "scale(1.05)" }}
                      />
                    </Link>
                  </Box>
                  <BlogTags tags={item.tags} marginTop={3} />
                  <Heading fontSize="xl" marginTop="2">
                    <Link href={`/${item.slug}`}>
                      <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                        {item.title}
                      </Text>
                    </Link>
                  </Heading>
                  <Text as="p" fontSize="md" marginTop="2">
                    {item.description}
                  </Text>
                </Box>
              </WrapItem>
            </Wrap>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ArticleList;