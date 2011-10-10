{
    "pageURL":"http://dfgdggdgdgdg.dgdg",
    "pageName":"1-Wire and iButton",
    	
    "name":"DS24B33",
	"id":"6641",
    "descr":"The DSSHA1 coprocessor with 64-Byte RAM is a synthesizable register transfer level (RTL) implementation of the FIPS 180-3 Secure Hash Algorithm (SHA-1), eliminating the need to develop software to perform the complex SHA-1 computation required for authenticating SHA-1 devices. The DSSHA1 can compute SHA-1 message authentication codes (MACs) for use with Maxim SHA-1 devices, such as the DS1963S, DS1961S, DS28E10, DS28E02, DS2460, DS28CN01, and DS28E01-100. The device can output the 20-byte MAC result from registers required for comparison against SHA-1 slave devices. When incorporated into a design, DSSHA1 also provides an offloading function, relieving a microcontroller of performing the SHA-1 computation.",
    "datasheetURL":"http://datasheets.maxim-ic.com/en/ds/DSSHA1.pdf",
	"diagram":"datasheet/index.mvp/id/diagrams/6641.gif",
    "key_f":[
		"SHA-1 Computations Within 670 Clock Cycles (13.4 s at a Typical Frequency of 50MHz)",
		"Area Estimate is 102,256 m? in TSMC CL018G (0.18 m Generic Process)",
		"Dedicated Hardware-Accelerated SHA-1 Engine for Generating MACs",
		"64-Byte RAM for Message Input",
		"Five 32-Bit Registers to Read the MAC Result",
		"Available in Synthesizable Verilog",
		"Made as a Low-Level Module to be Instantiated by a Top-Level Module",
		"Includes Test Bench"
    ],
    "app" : [
        "Board Identification",
        "Medical Sensor Calibration Data Storage",
        "Smart Cables",
        "Storage of Calibration Constants",
        "Storage of Product Revision Status",
    ]
			
}