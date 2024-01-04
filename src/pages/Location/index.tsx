import { useState } from "react";
import {
  getLocation,
  createLocation,
  deleteLocation,
  updateLocation,
} from "api/location";
import { handleErrorMessage } from "i18n";
import { useQuery, useMutation } from "react-query";
import { handleSuccessMessage } from "utils/helper/common";
import { Table, Button, Modal, Form, Input } from "antd";
import useProfile from "utils/hooks/useProfile";

function Location() {
  const { profile } = useProfile();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  const {
    data: locations,
    isFetching,
    refetch,
  } = useQuery(["locations"], () => getLocation(), {
    keepPreviousData: true,
  });

  const createLocationMutation = useMutation((newLocation) =>
    createLocation(newLocation)
  );

  const deleteLocationMutation = useMutation((locationId: number) =>
    deleteLocation(locationId)
  );

  const updateLocationMutation = useMutation({
    mutationFn: (variables: { id: number; updatedLocation: any }) =>
      updateLocation(variables.id, variables.updatedLocation),
  });

  const handleCreateLocation = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsUpdateModalVisible(false);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      await createLocationMutation.mutateAsync(values);
      refetch(); // Refresh the locations data after creating a new location
      handleSuccessMessage("Location created successfully");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      handleErrorMessage("Location created failed");
      // Handle error
    }
  };

  const handleDeleteLocation = async (locationId: number) => {
    try {
      await deleteLocationMutation.mutateAsync(locationId);
      refetch(); // Refresh the locations data after deleting a location
      handleSuccessMessage("Delete location successfully");
    } catch (error) {
      // Handle error
      handleErrorMessage("Delete location failed");
    }
  };

  const handleUpdateLocation = async () => {
    try {
      const values = updateForm.getFieldsValue();
      console.log(values);
      const { ...updatedLocation } = values;
      await updateLocationMutation.mutateAsync({
        id: updateId,
        updatedLocation,
      });
      refetch(); // Refresh the locations data after updating a location
      handleSuccessMessage("Update location successfully");
      setIsUpdateModalVisible(false);
      updateForm.resetFields();
    } catch (error) {
      handleErrorMessage("Update location failed");
      // Handle error
    }
  };

  const [updateId, setUpdateId] = useState<number>(0);
  const handleOpenUpdateModal = (id: number, location: any) => {
    setIsUpdateModalVisible(true);
    setUpdateId(id);
    updateForm.setFieldsValue(location); // Fill existing data to updateForm as a prefill
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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <span>
          <Button onClick={() => handleDeleteLocation(record.id)}>
            Delete
          </Button>
          <Button onClick={() => handleOpenUpdateModal(record.id, record)}>
            Update
          </Button>
        </span>
      ),
    },
  ];

  return profile?.role === "admin" ? (
    <>
      <Button onClick={handleCreateLocation}>Create Location</Button>
      <Modal
        title="Create Location"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lat"
            label="Latitude"
            rules={[{ required: true, message: "Please enter a latitude" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="long"
            label="Longitude"
            rules={[{ required: true, message: "Please enter a longitude" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update Location"
        visible={isUpdateModalVisible}
        onOk={handleUpdateLocation}
        onCancel={handleCancel}
      >
        <Form form={updateForm}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="lat" label="Latitude">
            <Input />
          </Form.Item>
          <Form.Item name="long" label="Longitude">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={locations}
        loading={isFetching}
        rowKey="id"
      />
    </>
  ) : (
    <div>Not authorize</div>
  );
}

export default Location;
