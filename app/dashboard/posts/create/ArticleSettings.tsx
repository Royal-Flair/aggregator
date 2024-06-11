import React, { useState } from "react";
import {
  Stack,
  Accordion,
  AccordionItem,
  Box,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Heading,
  Input,
  FormControl,
  Image,
  Button,
  Center,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { Select } from "chakra-react-select";
import { tagOption } from "./TagOptions";
import { createClient } from "@/app/lib/supabase/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ArticleSettingProps {
  body: string;
}

interface FormValues {
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
}

const ArticleSettings = ({ body }: ArticleSettingProps) => {
  const supabase = createClient();
  const [imgURL, setImgURL] = useState<string | null>(null);
  const router = useRouter();

  const getSlug = (title: string) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const cleanSlug = slug.replace(/[^\w\-]+/g, "");
    return cleanSlug;
  };

  const handleSubmit = async (values: FormValues) => {
    const articleData = {
      title: values.title,
      markdown: body,
      description: values.description,
      thumbnail: values.thumbnail,
      tags: values.tags,
      slug: getSlug(values.title),
    };

    const { error } = await supabase.from("posts").insert(articleData);
    if (error) {
      toast.error("Article not added!");
      console.log(error);
    } else {
      toast.success("Article added!");
      console.log(error);
      router.push("/");
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        tags: [],
        thumbnail: "",
      }}
      enableReinitialize={true}
      onSubmit={(values: FormValues) => handleSubmit(values)}
    >
      {({ values, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
        <Stack>
          <Accordion
            allowToggle
            bg="white"
            borderRadius="10px"
            p="18px 25px"
            mt="32px"
          >
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading variant="tertiary-heading">Article Setting</Heading>
                </Box>

                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack spacing={2}>
                  <FormControl>
                    <Heading variant="tertiary-heading">Title</Heading>
                    <Input
                      variant={"form-input"}
                      name="title"
                      type="text"
                      placeholder={"Title of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Description</Heading>
                    <Input
                      variant={"form-input"}
                      name="description"
                      type="text"
                      placeholder={"Description of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                  </FormControl>
                  <Heading variant="tertiary-heading">Thumbnail</Heading>
                  <Stack>
                    {imgURL != null && (
                      <div>
                        <Image
                          width={{ base: "100%", md: "60%", lg: "40%" }}
                          objectFit="cover"
                          src={imgURL}
                          alt={values.title}
                        />
                      </div>
                    )}
                    <FormControl>
                      <Input
                        variant={"form-input-file"}
                        name="thumbnail"
                        type="file"
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files) return;
                          const timestamp = Date.now();
                          const { data, error } = await supabase.storage
                            .from("thumbnail")
                            .upload(
                              `${timestamp}-${files[0].name}`,
                              files[0],
                              {
                                cacheControl: "3600",
                                upsert: false,
                              }
                            );
                          if (error) {
                            console.log(error);
                            return;
                          }
                          const path = data.path.replace(/ /g, "%20");
                          const SUPABASE_REFERENCE = "euxlzwytljyuljtikgac";
                          const URL = `https://${SUPABASE_REFERENCE}.supabase.co/storage/v1/object/public/thumbnail/${path}`;
                          setImgURL(URL);
                          setFieldValue("thumbnail", URL);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                  </Stack>
                  <FormControl>
                    <Heading variant="tertiary-heading">Tag(Max:4)</Heading>
                    <Select
                      id="tags_label"
                      name="tags_label"
                      variant="filled"
                      isMulti={true}
                      colorScheme="purple"
                      value={values.tags.map((tag) => ({
                        value: tag,
                        label: tag,
                      }))}
                      onChange={(e) => {
                        setFieldValue("tags_label", e);
                        const tagArr = e.map((item) => item.value);
                        setFieldValue("tags", tagArr);
                      }}
                      options={tagOption}
                    />
                  </FormControl>
                  <Center>
                    <Button variant="primary-button" onClick={() => handleSubmit()}>
                      Publish
                    </Button>
                  </Center>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      )}
    </Formik>
  );
};

export default ArticleSettings;