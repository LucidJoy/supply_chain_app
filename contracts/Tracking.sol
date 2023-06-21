// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Tracking {
    enum ShipmentStatus {
        PENDING,
        IN_TRANSIT,
        DELIVERED
    }

    struct Shipment {
        address sender;
        address receiver;
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(address => Shipment[]) public shipments;
    uint public shipmentCount;

    struct TypeShipment {
        address sender;
        address receiver;
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    TypeShipment[] typeShipments;

    event ShipmentCreated(
        address indexed sender,
        address indexed receiver,
        uint pickupTime,
        uint distance,
        uint price
    );
    event ShipmentInTransit(
        address indexed sender,
        address indexed receiver,
        uint pickupTime
    );
    event ShipmentDelivered(
        address indexed sender,
        address indexed receiver,
        uint deliveryTime
    );
    event ShipmentPaid(
        address indexed sender,
        address indexed receiver,
        uint amount
    );

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(
        address _receiver,
        uint _pickupTime,
        uint _distance,
        uint _price
    ) public payable {
        require(msg.value == _price, "Payment amount not euqal to price");

        Shipment memory shipment = Shipment(
            msg.sender,
            _receiver,
            _pickupTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false
        );

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        typeShipments.push(
            TypeShipment(
                msg.sender,
                _receiver,
                _pickupTime,
                0,
                _distance,
                _price,
                ShipmentStatus.PENDING,
                false
            )
        );

        emit ShipmentCreated(
            msg.sender,
            _receiver,
            _pickupTime,
            _distance,
            _price
        );
    }

    // product ready for shipment
    function startShipment(
        address _sender,
        address _receiver,
        uint _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid address");
        require(
            shipment.status == ShipmentStatus.PENDING,
            "Shipment already in transit"
        );

        shipment.status = ShipmentStatus.IN_TRANSIT;
        typeShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }

    function completeShipment(
        address _sender,
        address _receiver,
        uint _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid address");
        require(
            shipment.status == ShipmentStatus.IN_TRANSIT,
            "Shipment not in transit"
        );
        require(!shipment.isPaid, "Already paid");

        shipment.status = ShipmentStatus.DELIVERED;
        typeShipment.status = ShipmentStatus.DELIVERED;
        typeShipment.deliveryTime = block.timestamp;
        shipment.deliveryTime = block.timestamp;

        uint amount = shipment.price;

        payable(shipment.sender).transfer(amount);

        shipment.isPaid = true;
        typeShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    function getShipment(
        address _sender,
        uint _index
    ) public view returns (Shipment memory) {
        return shipments[_sender][_index];
    }

    function getShipmentsCount(address _sender) external view returns (uint) {
        return shipments[_sender].length;
    }

    function getAllTransaction() external view returns (TypeShipment[] memory) {
        return typeShipments;
    }
}
