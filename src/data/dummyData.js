// Data dummy ini mensimulasikan fasilitas yang ditemukan dalam radius 15 menit
// Koordinat berpusat di sekitar Simpang Lima Semarang (-6.9929, 110.4253)
export const dummyFacilities = [
	{
		id: 1,
		name: "RS St. Elisabeth Semarang",
		type: "kesehatan",
		position: [-6.991, 110.423],
		address: "Jl. Kawi No.1, Tegalsari",
		contact: "(024) 8310035",
		hours: "24 Jam",
	},
	{
		id: 2,
		name: "Puskesmas Karangkidul",
		type: "kesehatan",
		position: [-6.994, 110.428],
		address: "Jl. Karangkidul No.15",
		contact: "(024) 8502341",
		hours: "07:00 - 21:00",
	},
	{
		id: 3,
		name: "Gereja Katedral Semarang",
		type: "gereja",
		position: [-6.9895, 110.4248],
		address: "Jl. Pandanaran No.15",
		contact: "(024) 8314578",
		hours: "05:00 - 20:00",
	},
	{
		id: 4,
		name: "Klenteng Tek Hay Kiong",
		type: "klenteng",
		position: [-6.9902, 110.4265],
		address: "Jl. Gang Lombok No.32",
		contact: "(024) 3564233",
		hours: "06:00 - 18:00",
	},
	{
		id: 5,
		name: "Pura Giri Natha",
		type: "pura",
		position: [-6.995, 110.42],
		address: "Jl. Pandanaran No.89",
		contact: "(024) 8441230",
		hours: "05:00 - 19:00",
	},
	{
		id: 6,
		name: "Vihara Buddhagaya Watugong",
		type: "vihara",
		position: [-6.988, 110.429],
		address: "Jl. Watugong No.12",
		contact: "(024) 7605432",
		hours: "05:00 - 18:00",
	},
	{
		id: 7,
		name: "Gereja Blenduk",
		type: "gereja",
		position: [-6.987, 110.421],
		address: "Jl. Letjen Suprapto No.32",
		contact: "(024) 3541876",
		hours: "06:00 - 19:00",
	},
	{
		id: 8,
		name: "RSUD K.R.M.T Wongsonegoro",
		type: "kesehatan",
		position: [-6.996, 110.432],
		address: "Jl. Fatmawati No.1",
		contact: "(024) 6710081",
		hours: "24 Jam",
	},
	{
		id: 9,
		name: "Klenteng Tay Kak Sie",
		type: "klenteng",
		position: [-6.992, 110.424],
		address: "Jl. Gang Pinggir No.74",
		contact: "(024) 3555512",
		hours: "06:00 - 18:00",
	},
	{
		id: 10,
		name: "Pura Agung Girinatha",
		type: "pura",
		position: [-6.9925, 110.4235],
		address: "Jl. Simongan Raya No.45",
		contact: "(024) 7472156",
		hours: "05:00 - 19:00",
	},
];

export const dummyGeographicInfo = {
	populationDensity: "Tinggi",
	kelurahan: "Mugassari",
	kecamatan: "Semarang Selatan",
};

// Contoh polygon untuk area 15 menit berjalan kaki (sekitar 1.2 km radius)
// Ini adalah bentuk kasar dan idealnya didapat dari API isochrone
export const dummyIsochrone = [
	[
		[-6.9995, 110.4253],
		[-6.9975, 110.431],
		[-6.9929, 110.434],
		[-6.988, 110.431],
		[-6.9863, 110.4253],
		[-6.988, 110.419],
		[-6.9929, 110.416],
		[-6.9975, 110.419],
		[-6.9995, 110.4253],
	],
];
