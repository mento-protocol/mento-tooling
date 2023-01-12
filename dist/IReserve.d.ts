import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export interface IReserveInterface extends utils.Interface {
    functions: {
        "addCollateralAsset(address)": FunctionFragment;
        "addExchangeSpender(address)": FunctionFragment;
        "addSpender(address)": FunctionFragment;
        "addToken(address)": FunctionFragment;
        "getDailySpendingRatioForCollateralAsset(address)": FunctionFragment;
        "getOrComputeTobinTax()": FunctionFragment;
        "getReserveGoldBalance()": FunctionFragment;
        "getReserveRatio()": FunctionFragment;
        "getTokens()": FunctionFragment;
        "getUnfrozenReserveGoldBalance()": FunctionFragment;
        "isCollateralAsset(address)": FunctionFragment;
        "isExchangeSpender(address)": FunctionFragment;
        "isStableAsset(address)": FunctionFragment;
        "removeExchangeSpender(address,uint256)": FunctionFragment;
        "removeSpender(address)": FunctionFragment;
        "removeToken(address,uint256)": FunctionFragment;
        "setTobinTaxStalenessThreshold(uint256)": FunctionFragment;
        "transferCollateralAsset(address,address,uint256)": FunctionFragment;
        "transferExchangeCollateralAsset(address,address,uint256)": FunctionFragment;
        "transferExchangeGold(address,uint256)": FunctionFragment;
        "transferGold(address,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addCollateralAsset" | "addExchangeSpender" | "addSpender" | "addToken" | "getDailySpendingRatioForCollateralAsset" | "getOrComputeTobinTax" | "getReserveGoldBalance" | "getReserveRatio" | "getTokens" | "getUnfrozenReserveGoldBalance" | "isCollateralAsset" | "isExchangeSpender" | "isStableAsset" | "removeExchangeSpender" | "removeSpender" | "removeToken" | "setTobinTaxStalenessThreshold" | "transferCollateralAsset" | "transferExchangeCollateralAsset" | "transferExchangeGold" | "transferGold"): FunctionFragment;
    encodeFunctionData(functionFragment: "addCollateralAsset", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "addExchangeSpender", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "addSpender", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "addToken", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getDailySpendingRatioForCollateralAsset", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getOrComputeTobinTax", values?: undefined): string;
    encodeFunctionData(functionFragment: "getReserveGoldBalance", values?: undefined): string;
    encodeFunctionData(functionFragment: "getReserveRatio", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTokens", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUnfrozenReserveGoldBalance", values?: undefined): string;
    encodeFunctionData(functionFragment: "isCollateralAsset", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isExchangeSpender", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isStableAsset", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeExchangeSpender", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "removeSpender", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeToken", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setTobinTaxStalenessThreshold", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transferCollateralAsset", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferExchangeCollateralAsset", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferExchangeGold", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transferGold", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "addCollateralAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addExchangeSpender", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addSpender", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDailySpendingRatioForCollateralAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOrComputeTobinTax", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getReserveGoldBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getReserveRatio", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUnfrozenReserveGoldBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isCollateralAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isExchangeSpender", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isStableAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeExchangeSpender", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeSpender", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTobinTaxStalenessThreshold", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferCollateralAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferExchangeCollateralAsset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferExchangeGold", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferGold", data: BytesLike): Result;
    events: {};
}
export interface IReserve extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IReserveInterface;
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
        addCollateralAsset(asset: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addExchangeSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addToken(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getDailySpendingRatioForCollateralAsset(collateralAsset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getOrComputeTobinTax(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getReserveGoldBalance(overrides?: CallOverrides): Promise<[BigNumber]>;
        getReserveRatio(overrides?: CallOverrides): Promise<[BigNumber]>;
        getTokens(overrides?: CallOverrides): Promise<[string[]]>;
        getUnfrozenReserveGoldBalance(overrides?: CallOverrides): Promise<[BigNumber]>;
        isCollateralAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isExchangeSpender(exchange: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isStableAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        removeExchangeSpender(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeToken(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setTobinTaxStalenessThreshold(arg0: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferExchangeCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferExchangeGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addCollateralAsset(asset: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addExchangeSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addToken(arg0: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getDailySpendingRatioForCollateralAsset(collateralAsset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    getOrComputeTobinTax(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getReserveGoldBalance(overrides?: CallOverrides): Promise<BigNumber>;
    getReserveRatio(overrides?: CallOverrides): Promise<BigNumber>;
    getTokens(overrides?: CallOverrides): Promise<string[]>;
    getUnfrozenReserveGoldBalance(overrides?: CallOverrides): Promise<BigNumber>;
    isCollateralAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isExchangeSpender(exchange: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isStableAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    removeExchangeSpender(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeToken(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setTobinTaxStalenessThreshold(arg0: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferExchangeCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferExchangeGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addCollateralAsset(asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        addExchangeSpender(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        addSpender(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        addToken(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        getDailySpendingRatioForCollateralAsset(collateralAsset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getOrComputeTobinTax(overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        getReserveGoldBalance(overrides?: CallOverrides): Promise<BigNumber>;
        getReserveRatio(overrides?: CallOverrides): Promise<BigNumber>;
        getTokens(overrides?: CallOverrides): Promise<string[]>;
        getUnfrozenReserveGoldBalance(overrides?: CallOverrides): Promise<BigNumber>;
        isCollateralAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isExchangeSpender(exchange: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isStableAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        removeExchangeSpender(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        removeSpender(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        removeToken(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        setTobinTaxStalenessThreshold(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        transferCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        transferExchangeCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        transferExchangeGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        transferGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {};
    estimateGas: {
        addCollateralAsset(asset: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addExchangeSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addToken(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getDailySpendingRatioForCollateralAsset(collateralAsset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getOrComputeTobinTax(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getReserveGoldBalance(overrides?: CallOverrides): Promise<BigNumber>;
        getReserveRatio(overrides?: CallOverrides): Promise<BigNumber>;
        getTokens(overrides?: CallOverrides): Promise<BigNumber>;
        getUnfrozenReserveGoldBalance(overrides?: CallOverrides): Promise<BigNumber>;
        isCollateralAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isExchangeSpender(exchange: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isStableAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        removeExchangeSpender(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeToken(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setTobinTaxStalenessThreshold(arg0: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferExchangeCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferExchangeGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addCollateralAsset(asset: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addExchangeSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addToken(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getDailySpendingRatioForCollateralAsset(collateralAsset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getOrComputeTobinTax(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getReserveGoldBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getReserveRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUnfrozenReserveGoldBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isCollateralAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isExchangeSpender(exchange: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isStableAsset(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        removeExchangeSpender(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeSpender(arg0: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeToken(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setTobinTaxStalenessThreshold(arg0: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferExchangeCollateralAsset(collateralAsset: PromiseOrValue<string>, to: PromiseOrValue<string>, value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferExchangeGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferGold(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
