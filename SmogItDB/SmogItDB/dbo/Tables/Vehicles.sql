CREATE TABLE [dbo].[Vehicles] (
    [VehicleId]    INT          IDENTITY (1, 1) NOT NULL,
    [ClientId]     INT          NOT NULL,
    [VehicleMake]  VARCHAR (50) NOT NULL,
    [VehicleModel] VARCHAR (50) NOT NULL,
    [LicensePlate] VARCHAR (20) NULL,
    CONSTRAINT [PK_Vehicles] PRIMARY KEY CLUSTERED ([VehicleId] ASC),
    CONSTRAINT [FK_Vehicles_Clients] FOREIGN KEY ([ClientId]) REFERENCES [dbo].[Clients] ([ClientId])
);

