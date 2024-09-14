import {
  BeneficiaryAdded as BeneficiaryAddedEvent,
  ProjectCreated as ProjectCreatedEvent,
  TransferToVendor as TransferToVendorEvent,
  VendorAdded as VendorAddedEvent
} from "../generated/ProjectManager/ProjectManager"
import {
  BeneficiaryAdded,
  ProjectCreated,
  TransferToVendor,
  VendorAdded
} from "../generated/schema"

import { ProjectToken } from "../generated/templates"
import { getProjectBalance, getProjectDetails } from "./utils"

export function handleBeneficiaryAdded(event: BeneficiaryAddedEvent): void {
  let entity = new BeneficiaryAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenAddress = event.params.tokenAddress
  entity.benAddress = event.params.benAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  

  entity.save()
  getProjectBalance(event.params.projectId,event.params.tokenAddress,event.address);
}

export function handleProjectCreated(event: ProjectCreatedEvent): void {
  let entity = new ProjectCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.symbol = event.params.symbol
  entity.tokenAddress = event.params.tokenAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.projectId = event.params.projectId

  entity.save()
  getProjectDetails(event.params.name,event.params.symbol,event.params.tokenAddress,event.params.projectId,event.address);
  getProjectBalance(event.params.projectId,event.params.tokenAddress,event.address);
 ProjectToken.create(event.params.tokenAddress)
}

export function handleTransferToVendor(event: TransferToVendorEvent): void {
  let entity = new TransferToVendor(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vendorAddress = event.params.vendorAddress
  entity.ben = event.params.ben
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVendorAdded(event: VendorAddedEvent): void {
  let entity = new VendorAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vendorAddress = event.params.vendorAddress
  entity.project = event.params.project

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
