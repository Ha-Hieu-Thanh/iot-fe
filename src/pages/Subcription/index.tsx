import { getLocation, getLocationByUser } from "api/location";
import { useQuery } from "react-query";
import { Table } from "antd";
import useProfile from "utils/hooks/useProfile";
import { Button } from "antd";
import { subcribe, unSubscribe } from "api/subcription";
import { handleErrorMessage, handleSuccessMessage } from "utils/helper/common";

function Subcription() {
  const { profile } = useProfile();
  console.log(profile);
  const {
    data: locations,
    isFetching,
    refetch,
  } = useQuery(["locations", profile.id], () => getLocationByUser(), {
    keepPreviousData: true,
  });

  const handleSubscribe = async (record: any) => {
    try {
      console.log(record);
      console.log(record.id);
      const response = await subcribe(+record.id);
      handleSuccessMessage("Subscribe completed successfully");
      refetch();
    } catch (err) {
      handleErrorMessage("Subscribe failed");
    }
  };

  const handleUnsubscribe = async (record: any) => {
    try {
      const response = await unSubscribe(+record.id);
      handleSuccessMessage("Unsubscribe completed successfully");
      console.log(response);
      refetch();
    } catch (err) {
      handleErrorMessage("Unsubscribe failed");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Latitude",
      dataIndex: "lat",
      key: "lat",
    },
    {
      title: "Longitude",
      dataIndex: "long",
      key: "long",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <>
          {record.isSubscribed ? (
            <Button onClick={async () => await handleUnsubscribe(record)}>
              Unsubscribe
            </Button>
          ) : (
            <Button onClick={async () => await handleSubscribe(record)}>
              Subscribe
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={locations}
        columns={columns}
        loading={isFetching}
        pagination={false}
      />
    </>
  );
}

export default Subcription;
