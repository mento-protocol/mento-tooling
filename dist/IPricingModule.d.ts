import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export interface IPricingModuleInterface extends utils.Interface {
    functions: {
        "getAmountIn(uint256,uint256,uint256,uint256)": FunctionFragment;
        "getAmountOut(uint256,uint256,uint256,uint256)": FunctionFragment;
        "name()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getAmountIn" | "getAmountOut" | "name"): FunctionFragment;
    encodeFunctionData(functionFragment: "getAmountIn", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getAmountOut", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    decodeFunctionResult(functionFragment: "getAmountIn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAmountOut", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    events: {};
}
export interface IPricingModule extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IPricingModuleInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        getAmountIn(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            amountIn: BigNumber;
        }>;
        getAmountOut(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            amountOut: BigNumber;
        }>;
        name(overrides?: CallOverrides): Promise<[string] & {
            pricingModuleName: string;
        }>;
    };
    getAmountIn(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getAmountOut(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        getAmountIn(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getAmountOut(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        getAmountIn(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getAmountOut(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getAmountIn(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAmountOut(tokenInBucketSize: PromiseOrValue<BigNumberish>, tokenOutBucketSize: PromiseOrValue<BigNumberish>, spread: PromiseOrValue<BigNumberish>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
