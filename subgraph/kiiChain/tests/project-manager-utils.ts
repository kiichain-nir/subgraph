import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BeneficiaryAdded,
  ProjectCreated,
  TransferToVendor,
  VendorAdded
} from "../generated/ProjectManager/ProjectManager"

export function createBeneficiaryAddedEvent(
  tokenAddress: Address,
  benAddress: Address,
  amount: BigInt
): BeneficiaryAdded {
  let beneficiaryAddedEvent = changetype<BeneficiaryAdded>(newMockEvent())

  beneficiaryAddedEvent.parameters = new Array()

  beneficiaryAddedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  beneficiaryAddedEvent.parameters.push(
    new ethereum.EventParam(
      "benAddress",
      ethereum.Value.fromAddress(benAddress)
    )
  )
  beneficiaryAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return beneficiaryAddedEvent
}

export function createProjectCreatedEvent(
  name: string,
  symbol: string,
  tokenAddress: Address
): ProjectCreated {
  let projectCreatedEvent = changetype<ProjectCreated>(newMockEvent())

  projectCreatedEvent.parameters = new Array()

  projectCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  projectCreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  projectCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return projectCreatedEvent
}

export function createTransferToVendorEvent(
  vendorAddress: Address,
  ben: Address,
  amount: BigInt
): TransferToVendor {
  let transferToVendorEvent = changetype<TransferToVendor>(newMockEvent())

  transferToVendorEvent.parameters = new Array()

  transferToVendorEvent.parameters.push(
    new ethereum.EventParam(
      "vendorAddress",
      ethereum.Value.fromAddress(vendorAddress)
    )
  )
  transferToVendorEvent.parameters.push(
    new ethereum.EventParam("ben", ethereum.Value.fromAddress(ben))
  )
  transferToVendorEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return transferToVendorEvent
}

export function createVendorAddedEvent(
  vendorAddress: Address,
  project: BigInt
): VendorAdded {
  let vendorAddedEvent = changetype<VendorAdded>(newMockEvent())

  vendorAddedEvent.parameters = new Array()

  vendorAddedEvent.parameters.push(
    new ethereum.EventParam(
      "vendorAddress",
      ethereum.Value.fromAddress(vendorAddress)
    )
  )
  vendorAddedEvent.parameters.push(
    new ethereum.EventParam(
      "project",
      ethereum.Value.fromUnsignedBigInt(project)
    )
  )

  return vendorAddedEvent
}
