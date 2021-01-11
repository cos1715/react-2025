import React from 'react';
import NextLink from 'next/link';
import { Box, Link } from '@chakra-ui/core';
import { parseISO, format } from 'date-fns';
import { Table, Tr, Th, Td } from '../table';
// import { DeleteSiteButton } from '../delete-site-button';
import { ISite } from '@/models';

interface IProps {
  sites: ISite[];
}

export const SiteTable: React.FC<IProps> = ({ sites }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site, index) => (
            <Box as="tr" key={site.id}>
              <Td>
                <NextLink
                  href="/sites/[siteId]"
                  as={`/sites/${site.id}`}
                  passHref
                >
                  <Link id={`site-table-link-${index}`} fontWeight="medium">
                    {site.name}
                  </Link>
                </NextLink>
              </Td>
              <Td>
                <Link href={site.link} isExternal>
                  {site.link}
                </Link>
              </Td>
              <Td>
                <NextLink
                  href="/sites/[siteId]"
                  as={`/sites/${site.id}`}
                  passHref
                >
                  <Link color="blue.500" fontWeight="medium">
                    View Feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
              <Td>
                {/* <DeleteSiteButton siteId={site.id} /> */}
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};
