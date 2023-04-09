import React, { useCallback } from 'react';
import { DropdownProps, Icon, Menu, Select, Table } from 'semantic-ui-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number | null;
  onPageChange: (param: number) => void;
  pageSize: number;
  handlePerPageChange: (param: number) => void;
}

const perPageOptions = [
  { value: 10, text: '10', key: '10' },
  { value: 15, text: '15', key: '15' },
  { value: 20, text: '20', key: '20' },
];

export const TablePagination = React.memo(function TablePagination({
  currentPage,
  totalPages = 0,
  onPageChange,
  pageSize,
  handlePerPageChange,
}: PaginationProps) {
  const handleClick = useCallback(
    (page: number) => {
      if (page < 1 || !totalPages || page > totalPages) {
        return;
      }

      onPageChange(page);
    },
    [onPageChange, totalPages]
  );

  const handleChange = (
    e: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    if (data.value) {
      handlePerPageChange(+data.value || 0);
    }
  };

  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="5">
          <Select
            placeholder="Results per page: "
            options={perPageOptions}
            onChange={handleChange}
            value={pageSize}
          />
          <Menu floated="right" pagination>
            <Menu.Item as="a" icon onClick={() => handleClick(currentPage - 1)}>
              <Icon name="chevron left" />
            </Menu.Item>
            <Menu.Item as="a">
              Page {currentPage} of {totalPages}
            </Menu.Item>
            <Menu.Item as="a" icon onClick={() => handleClick(currentPage + 1)}>
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
});
