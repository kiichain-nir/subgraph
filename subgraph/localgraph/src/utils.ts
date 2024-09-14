import { ProjectBalance, ProjectDetail } from "../generated/schema";
import { ProjectManager } from "../generated/ProjectManager/ProjectManager";
import { Address, BigInt } from "@graphprotocol/graph-ts";


export const getProjectDetails = (name:string,symbol:string,tokenAddress:Address,projectId:BigInt,projectAddress:Address): ProjectDetail| null =>{
    let projectdetail = ProjectDetail.load(projectId.toString());
    
    if (projectdetail == null){

        projectdetail = new ProjectDetail(projectId.toString());
        projectdetail.name = name;
        projectdetail.symbol = symbol;
        projectdetail.tokenAddress = tokenAddress;
        projectdetail.save();
        
        
    }
    projectdetail.save();
    return projectdetail;
}

export const getProjectBalance =(projectId: BigInt,tokenAddress:Address,projectAddress:Address):ProjectBalance |null =>{
    let projectbalance = ProjectBalance.load(projectId.toString());
    let projectContract = ProjectManager.bind(projectAddress);
    let projectBalance = projectContract.try_getProjectBalance(tokenAddress);
    if(!projectBalance.reverted)
    {
        if(projectbalance ===  null)
        {
        projectbalance = new ProjectBalance(projectId.toString());
        projectbalance.availableBudget = projectBalance.value;
        projectbalance.budget = projectBalance.value;
        projectbalance.save();

        }
       projectbalance.availableBudget = projectBalance.value
       projectbalance.save();

    }

    return projectbalance;
}