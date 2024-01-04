import { getAlerts } from "api/alert";
import { useState } from "react";
import { useQuery } from "react-query";
import { Table, Pagination } from "antd";
import useProfile from "utils/hooks/useProfile";

function Alert() {
  const { profile } = useProfile();

  const [params, setParams] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const { data, isFetching, refetch } = useQuery(
    ["alerts", params],
    () => getAlerts(params),
    {
      keepPreviousData: true,
    }
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Subscription ID",
      dataIndex: "subscriptionId",
      key: "subscriptionId",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return profile?.role === "admin" ? (
    <>
      <Table
        dataSource={data?.data}
        columns={columns}
        loading={isFetching}
        pagination={false}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Pagination
          current={params.pageIndex}
          pageSize={params.pageSize}
          total={data?.totalItems}
          onChange={(page, pageSize) =>
            setParams({ ...params, pageIndex: page, pageSize })
          }
        />
      </div>
    </>
  ) : (
    <div>Not authorize</div>
  );
}

export default Alert;
