CREATE TABLE [dbo].[Vehicles] (
    [VehicleId]    INT          IDENTITY (1, 1) NOT NULL,
    [ClientId]     INT          NOT NULL,
    [ModelId]  SMALLINT NOT NULL,
    [LicensePlate] VARCHAR (20) NULL,
    [Year] SMALLINT NULL, 
    [VIN] VARCHAR(17) NULL, 
    CONSTRAINT [PK_Vehicles] PRIMARY KEY CLUSTERED ([VehicleId] ASC),
    CONSTRAINT [FK_Vehicles_Clients] FOREIGN KEY ([ClientId]) REFERENCES [dbo].[Clients] ([ClientId]),
    CONSTRAINT [FK_Vehicles_VehicleModel] FOREIGN KEY ([ModelId]) REFERENCES [dbo].[VehicleModel] ([ModelId])
);

